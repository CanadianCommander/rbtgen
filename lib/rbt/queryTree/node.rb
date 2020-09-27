module Rbt::QueryTree
  class Node

    attr_reader :id
    attr_accessor :model, :fields, :connections, :filter_composition

    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # @param [::Schema::Mapping::Model] model - the model that this node is
    def initialize(model)
      @id = SecureRandom.alphanumeric(20)
      @model = model
      @connections = []
      @filters = []
      @fields = []
      @filter_composition = ::Rbt::QueryTree::FilterComposition.new
    end

    # add a new field to the emit field list
    # @param [::Rbt::QueryTree::Field] field
    def add_field!(field)
      @fields << field
    end

    # add a new field to the emit field list
    # @param [String] name
    def add_field_by_name!(name)
      @fields << ::Rbt::QueryTree::Field.new(self, @model.get_column(name))
    end


    # add a filter to this node.
    # @param [::Rbt::QueryTree::Filter | ::Rbt::QueryTree::FilterComposition] filter - the new filter
    # @param [::Rbt::QueryTree::Filter::CONDITION] condition - the join condition to be used with the last filter
    def add_filter!(filter, condition)
      @filter_composition.add_filter!(filter, condition)
    end

    # get the filtering sql for this node
    # @return [String] sql
    def get_filter_sql
      return @filter_composition.get_filter_sql
    end

    # get a connection by its name
    # @param [String] name - the connection name
    # @return [Rbt::QueryTree::Connection] the connection
    def get_connection_by_name(name)
      return @connections.find {|con| con.through_relation.name == name}
    end

    # connect this node to another through the given relation
    # @param [::Rbt::QueryTree::Node] other_node - the node to connect to.
    # @param [::Schema::Mapping::Relation] relation - the relation that connects the two nodes
    def connect_to_node!(other_node, relation)
      @connections << ::Rbt::QueryTree::Connection.new(self, other_node, relation)
    end

    def has_filters?
      return !@filter_composition.empty?
    end
  end
end