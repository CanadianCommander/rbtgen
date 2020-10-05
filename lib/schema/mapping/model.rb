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
        @filters = []
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
      
      # get the primary column of this model 
      # @return [::Schema::Mapping::Column] the primary column
      def get_primary_column
        primary_column = @columns.find {|col| col.key == ::Schema::Mapping::Column::KEY::PRIMARY}

        if primary_column.nil?
          raise ::Schema::Error::MappingFormatError.new(::Schema::Error::MappingFormatError::TYPE::NO_MODEL_PRIMARY_KEY)
        end

        return primary_column
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

      # get a filter by name
      # @param [String] name - the name of the filter
      # @return [::Schema::Mapping::Filter] the filter
      def get_filter(name)
        filter = get_filters.find {|filter| filter.name == name}
        if filter.nil?
          raise ActiveRecord::RecordNotFound.new("No filter with name [#{name}]")
        end

        return filter
      end

      # get all filters defined on this table. including generated filters
      # @return [Array<::Schema::Mapping::Filter>] the filters
      def get_filters
        return @filters + get_generated_filters
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
          @columns << ::Schema::Mapping::Column.new(field_name.to_s, field_hash[:type].to_sym, field_hash[:key]&.to_sym, field_hash[:sql])
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

        # filters
        unless hash[:filters].nil?
          hash[:filters].each do |name, filter_hash|
            @filters << Filter.new(name.to_s, filter_hash[:sql], filter_hash[:required_tables])
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

      # ----------------------------------------------------------
      # Private Methods
      # ----------------------------------------------------------
      private

      # get generated files. These are basic filters generated of the columns in the model
      # @return [Array<::Schema::Mapping::Filter>] the generated filters
      def get_generated_filters
        filters = []
        @columns.each do |column|
          filters << ::Schema::Mapping::Filter.new("#{column.name}_gen_filter_eql",
                                                   "{{#{@table_name}.#{column.name}}} = #{::Schema::Mapping::Filter::VARIABLE_REPLACE_STRING}", self.table_name)
          filters << ::Schema::Mapping::Filter.new("#{column.name}_gen_filter_like",
                                                   "{{#{@table_name}.#{column.name}}} LIKE #{::Schema::Mapping::Filter::VARIABLE_REPLACE_STRING}", self.table_name)
          filters << ::Schema::Mapping::Filter.new("#{column.name}_gen_filter_lt",
                                                   "{{#{@table_name}.#{column.name}}} < #{::Schema::Mapping::Filter::VARIABLE_REPLACE_STRING}", self.table_name)
          filters << ::Schema::Mapping::Filter.new("#{column.name}_gen_filter_gt",
                                                   "{{#{@table_name}.#{column.name}}} > #{::Schema::Mapping::Filter::VARIABLE_REPLACE_STRING}", self.table_name)
        end
        
        @relations.each do |relation|
          filters << ::Schema::Mapping::Filter.new("#{relation.name}_exists",
                                                   "{{#{relation.to_table}.#{relation.to_model.get_primary_column.name}}} IS NOT NULL")
        end
        
        return filters
      end

    end
  end
end
