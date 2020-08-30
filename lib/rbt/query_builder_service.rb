module Rbt
  class QueryBuilderService

    attr_reader :database_map

    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # create the RBT generator service
    # @param [::Schema::Mapping::DatabaseMap] database_map - the map to be used in generation
    def initialize(database_map)
      @database_map = database_map
    end

    # convert the query described by the node tree to sql
    # @param [Rbt::QueryTree::Node] root_node - the root node of the query tree
    # @return [String] - the sql query
    def build_query(root_node)
      # TODO one day support for other databases
      return build_query_mariadb(root_node)
    end

    # ----------------------------------------------------------
    # Private Methods
    # ----------------------------------------------------------
    private

    # convert the query described by the node tree to sql for the maraidb database system
    # @param [Rbt::QueryTree::Node] root_node - the root node of the query tree
    # @return [String] - the sql query
    def build_query_mariadb(root_node)
      select_fields = []
      query = "FROM "

      traverse_nodes(root_node) do |node, con, leaving_subtree|
        if con.nil?
          if leaving_subtree
            query += "WHERE #{replace_sql_table_names_with_id(node, node.get_filter_sql)};"
          else
            select_fields += node.get_prefixed_fields
            query += "#{node.model.table_name} AS #{node.id} "
          end
        else
          if leaving_subtree
            query += "WHERE #{replace_sql_table_names_with_id(node, node.get_filter_sql)} "
            query += ") AS #{node.id} ON #{con.get_join_condition_sql} "
          else
            select_fields += node.get_prefixed_fields
            query += "#{con.get_join_sql_mariadb} (SELECT * FROM #{node.model.table_name} AS #{node.id} "
          end
        end
      end

      return "SELECT #{select_fields.join(", ")} #{query}"
    end

    # replace table_names found in sql with id's found in the subtree described by root node
    # @param [::Rbt::QueryTree::Node] root_node - the root node
    # @param [String] sql - sql to be edited
    # @return [String] the sql with table names replaced
    def replace_sql_table_names_with_id(root_node, sql)
      out_sql = sql
      traverse_nodes(root_node) do |node, con, leaving|
        unless leaving
          out_sql.gsub!(/(#{node.model.table_name})(\.)/, node.id + '\2' )
        end
      end
      return out_sql
    end

    # traverse nodes. yielding for each (DFS)
    # @param [Rbt::QueryTree::Node] node - the start node
    # @param [Rbt::QueryTree::Connection] src_connection - the connection that was traversed to get to the current node.
    # @yield a block provided with the current node that is being traversed. and the connection that was used to get there.
    # this block will be called a second time when leaving the nodes subtree, indicated by a value of true in the third parameter
    def traverse_nodes(node, src_connection = nil, &block)

      yield(node, src_connection, false)

      node.connections.each do |connection|
        traverse_nodes(connection.to_node, connection, &block)
      end

      yield(node, src_connection, true)
    end

  end
end