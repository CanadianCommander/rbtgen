module Schema
  module Error
    class MappingFormatError < StandardError

      attr_accessor :type

      module TYPE
        FILE_PARSE_ERROR = "file_parse_error".freeze
        NO_MODEL_DEFINITIONS = "no_model_definitions".freeze
        CUSTOM_FIELD_NO_SQL = "custom_field_no_sql".freeze
      end

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      # @param [TYPE] type - the type of format error
      # @param [string] msg - message
      def initialize(type, msg = nil)
        if msg.nil?
          msg = type.to_s
        end
        @type = type

        super(msg)
      end

    end
  end
end