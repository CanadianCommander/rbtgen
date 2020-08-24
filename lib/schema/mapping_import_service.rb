module Schema
  class MappingImportService

    attr_accessor :input_source

    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # @param [::Schema::Util::InputSource] input_source - input stream containing the raw database mapping.
    def initialize(input_source)
      @input_source = input_source
    end

    # create a database mapping based on the information contained in the input stream
    # @return [::Mapping::DatabaseMap] - database map object.
    def create_database_mapping
      parsed_input = @input_source.parse_input

      if parsed_input.is_a?(::Schema::Mapping::DatabaseMap)
        # data was serialized ruby objects, nothing to do.
        return parsed_input
      elsif parsed_input.is_a?(Hash)
        return load_from_hash(parsed_input)
      end
    end

    # ----------------------------------------------------------
    # Private Methods
    # ----------------------------------------------------------
    private

    def load_from_hash(hash)
      database_map = ::Schema::Mapping::DatabaseMap.new
      return database_map.populate_from_hash(hash)
    end

  end
end