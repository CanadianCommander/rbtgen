module Rbt::QueryTree
  class Connection

    attr_reader :from_node, :to_node, :through_relation

    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # build a new connection
    # @param [Rbt::QueryTree::Node] from_node - the node this connection comes from
    # @param [Rbt::QueryTree::Node] to_node - the node this connection goes to
    # @param [::Schema::Mapping::Relation] through_relation - the relation that describes this join
    def initialize(from_node, to_node, through_relation)
      @from_node = from_node
      @to_node = to_node
      @through_relation = through_relation
    end

    # get the join type as a Mariadb join string
    # @return [String] join stirng
    def get_join_sql_mariadb
      case through_relation.join_type
      when ::Schema::Mapping::Relation::JOIN_TYPE::LEFT
        return "LEFT JOIN"
      when ::Schema::Mapping::Relation::JOIN_TYPE::FULL
        return "JOIN"
      else
        raise StandardError.new("Unknown join type in relation #{through_relation.join_type}")
      end
    end

    # get the join condition sql for this connection
    # @return [String] join condition sql
    def get_join_condition_sql
      join_sql = through_relation.join_condition
      join_sql = ::Rbt::Util::Template.replace_table_name_with_id(join_sql, @from_node.model.table_name, @from_node.id)
      join_sql = ::Rbt::Util::Template.replace_table_name_with_id(join_sql, @to_node.model.table_name, @to_node.id)
      return join_sql
    end

  end
end