module Rbt::QueryTree
  class Filter

    module CONDITION
      NONE = :none.freeze
      AND = :and.freeze
      OR = :or.freeze
    end

    attr_reader :schema_filter, :next_filter, :next_condition
    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # @param [::Schema::Mapping::Filter] schema_filter - the filter this is based on
    def initialize(schema_filter)
      @schema_filter = schema_filter
      @next_condition = CONDITION::NONE
      @next_filter = nil
    end

    # link this filter to a next filter via condition
    # @param [::Rbt::QueryTree::Filter | ::Rbt::QueryTree::FilterComposition] filter - the next filter
    # @param [::Rbt::QueryTree::Filter::CONDITION] condition - filter "join" condition
    def set_next_filter!(filter, condition)
      @next_filter = filter
      @next_condition = condition
    end

    # get the sql for this filter
    # @return [String] the filter sql
    def get_filter_sql
      return @schema_filter.filter_sql
    end

    # get the next condition as SQL
    # @return [String] the next condition sql
    def next_condition_as_sql
      case @next_condition
      when CONDITION::NONE
        return ""
      when CONDITION::AND
        return "AND"
      when CONDITION::OR
        return "OR"
      end
    end

  end
end