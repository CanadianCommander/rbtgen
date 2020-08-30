module Schema::Mapping
  class Relation

    # from_table / to_table are table names
    # from_model / to_model are model pointers that point to the associated model
    attr_accessor :from_table, :from_model, :to_table, :to_model

    attr_reader :name, :join_type, :join_condition

    module JOIN_TYPE
      LEFT = :left.freeze
      FULL = :full.freeze
    end

    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # construct new relation
    # @param [name] name - relation name
    # @param [String] from_table - the table name that the join is coming from
    # @param [String] to_table - the table that is being joined
    # @param [JOIN_TYPE] join_type - the type of join
    # @param [String] join_condition - sql that would go in the "ON" statement
    def initialize(name, from_table, to_table, join_type, join_condition)
      @name = name
      @from_table = from_table
      @to_table = to_table
      @join_type = join_type.to_sym
      @join_condition = join_condition
    end

    # link this relation object to the from / to models
    # @param [Array<::Schema::Mapping::Model>] models - array of models to search
    def link_to_models(models)
      @from_model = models.find {|model| model.table_name == @from_table}
      @to_model = models.find {|model| model.table_name == @to_table}
    end

  end
end