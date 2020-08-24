module Schema
  module Mapping
    class Model

      attr_reader :table_name, :columns, :relations

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      def initialize
        @columns = []
        @relations = []
      end

      # get a column by name
      # @param [String] column_name - column name
      # @return [::Schema::Mapping::Column] the column
      def get_column(column_name)
        column = @columns.find {|col| col.name == column_name}
        if column.nil?
          raise ActiveRecord::RecordNotFound.new("No column with name [#{column_name}]")
        end

        return column
      end

      # get a relation by name
      # @param [String] relation_name - relation name
      # @return [::Schema::Mapping::Relation] the relation
      def get_relation(relation_name)
        relation = @relations.find {|rel| rel.name == relation_name}
        if relation.nil?
          raise ActiveRecord::RecordNotFound.new("No relation with name [#{relation_name}]")
        end

        return relation
      end

      # populate the model from hash
      # @param [string] table_name - model table name
      # @param [Hash] hash - model hash
      def populate_from_hash(table_name, hash)
        # check that we have some field definitions
        Schema::Util::Validation.require_keys(self.class.name, hash, :fields)

        # fields
        hash[:fields].each do |field_name, field_hash|
          ::Schema::Util::Validation.require_keys(self.class.name, field_hash, :type)
          @columns << ::Schema::Mapping::Column.new(field_name.to_s, field_hash[:type], field_hash[:key])
        end

        # relations
        unless hash[:relations].nil?
          hash[:relations].each do |relation_name, relation_hash|
            ::Schema::Util::Validation.require_keys(self.class.name, relation_hash, :from, :to)
            @relations << ::Schema::Mapping::Relation.new(relation_name.to_s, relation_hash[:from], relation_hash[:to],
                                                          relation_hash[:type] || ::Schema::Mapping::Relation::JOIN_TYPE::FULL,
                                                          relation_hash[:condition] || "")
          end
        end

        @table_name = table_name
        return self
      end

      def to_hash
        field_hash = {}
        @columns.each do |col|
          field_hash[col.name] = col.to_hash
        end

        {
          fields: field_hash
        }
      end

    end
  end
end
