module Schema
  module Util
    class InputSource
      attr_accessor :input_stream, :input_type

      module INPUT_TYPE
        JSON = "json".freeze
        YAML = "yaml".freeze
        RUBY = "ruby".freeze
      end

      # get input type from file path
      # @param [String] path - the file path to get the input type for
      # @return [INPUT_TYPE] - the input type of the path
      def self.input_type_from_path(path)
        case File.extname(path)
        when ".yml"
          return ::Schema::Util::InputSource::INPUT_TYPE::YAML
        when ".json"
          return ::Schema::Util::InputSource::INPUT_TYPE::JSON
        when ".rb"
          return ::Schema::Util::InputSource::INPUT_TYPE::RUBY
        else
          raise ArgumentError.new("Could not determine file type! for path [#{path}]")
        end
      end

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      # @param [IO] input_stream - input stream containing the raw database mapping.
      # @param [INPUT_TYPE] input_type - the type of the input
      def initialize(input_stream, input_type)
        @input_stream = input_stream
        @input_type = input_type
      end

      def parse_input
        begin
          case @input_type
          when INPUT_TYPE::JSON
            return JSON.parse(@input_stream.read).deep_symbolize_keys
          when INPUT_TYPE::YAML
            return YAML.safe_load(@input_stream.read).deep_symbolize_keys
          when INPUT_TYPE::RUBY
            return Marshal.load(@input_stream.read)
          end
        rescue StandardError => e
          raise ::Schema::Error::MappingFormatError.new(::Schema::Error::MappingFormatError::TYPE::FILE_PARSE_ERROR, e.to_s)
        end

      end

    end
  end
end