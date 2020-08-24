module Schema
  module Mapping
    class DatabaseMap

      attr_accessor :models, :relations, :filters

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      def initialize
        @models = []
      end

      # populate this database map object from the data contained in a hash
      # @param [Hash] hash - the hash to parse
      def populate_from_hash(hash)
        self.load_models(hash[:models])
        self.link_relations

        return self
      end

      # get model for the given table name
      # @param [String] table_name - the table who's model is to be fetched
      # @return [::Schema::Mapping::Model] the model
      def get_model(table_name)

        model = @models.find {|m| m.table_name == table_name}

        if model.nil?
          raise ActiveRecord::RecordNotFound.new("No model for table name [#{table_name}]")
        end

        return model
      end

      # ----------------------------------------------------------
      # Protected Methods
      # ----------------------------------------------------------
      protected

      # load model objects defined in hash
      # @param [Hash] models_hash - hash containing the model definitions
      def load_models(models_hash)
        if models_hash.length == 0
          raise ::Schema::Error::MappingFormatError.new(::Sqlast::Error::MappingFormatError::TYPE::NO_MODEL_DEFINITIONS)
        end

        models_hash.each do |key, model_hash|
          new_model = ::Schema::Mapping::Model.new
          @models << new_model.populate_from_hash(key.to_s, model_hash)
        end
      end

      # link relations to the associated model objects
      def link_relations
        @models.each do |model|
          model.relations.each do |relation|
            relation.link_to_models(@models)
          end
        end
      end

    end
  end
end