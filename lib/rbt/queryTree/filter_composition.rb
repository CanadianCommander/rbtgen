module Rbt::QueryTree
  class FilterComposition < ::Rbt::QueryTree::Filter
    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    def initialize
      super(nil)
      @root_filter = nil
    end

    # add filters to this filter composition
    # @param [::Rbt::QueryTree::Filter | ::Rbt::QueryTree::FilterComposition] filter - the next filter
    # @param [::Rbt::QueryTree::Filter::CONDITION] condition - filter "join" condition
    def add_filter!(filter, condition)
      if @root_filter.nil?
        @root_filter = filter
      else
        get_last_filter.set_next_filter!(filter, condition)
      end
    end

    # get the sql for this filter
    # @return [String] the filter sql
    def get_filter_sql
      filter_sql = "( "
      self.foreach_filter do |filter|
        filter_sql += "#{filter.get_filter_sql} #{filter.next_condition_as_sql} "
      end
      filter_sql += ")"
      return filter_sql
    end

    def empty?
      return @root_filter.nil?
    end

    # ----------------------------------------------------------
    # Private Methods
    # ----------------------------------------------------------
    private

    # get the last filter
    # @return [::Rbt::QueryTree::Filter] the last filter
    def get_last_filter
      if @root_filter.nil?
        return nil
      end

      curr_filter = @root_filter
      until curr_filter.next_filter.nil?
        curr_filter = curr_filter.next_filter
      end
      return curr_filter
    end

    # calls yield for each filter in filter chain
    # @yield - called for each filter in filter chain
    def foreach_filter
      curr_filter = @root_filter
      until curr_filter.nil?
        yield curr_filter
        curr_filter = curr_filter.next_filter
      end
    end

  end
end