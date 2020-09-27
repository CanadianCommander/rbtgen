module Rbt::QueryTree
  class Field

    attr_reader :column, :node
    attr_accessor :as_name

    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # @param [::Schema::Mapping::Column] column - the column that this field represents
    # @param [::Rbt::QueryTree::Node] node - the node who's id will be applied to the fields
    def initialize(node, column)
      @node = node
      @column = column
    end

    # get field sql
    def to_sql
      if @column.type == ::Schema::Mapping::Column::TYPE::CUSTOM
        return ::Rbt::Util::Template.prepend_id_to_fields(@column.custom_sql, @node.id) + as_name_sql
      else
        return "#{@node.id}.#{@column.name}" + as_name_sql
      end
    end

    # generate the as_name sql
    # @return SQL to preform the as name operation
    def as_name_sql
      unless @as_name.blank?
        return " AS `#{@as_name}` "
      end
      return ""
    end
  end
end