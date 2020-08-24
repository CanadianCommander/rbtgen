module Schema
  module Error
    class ValidationError < StandardError

      attr_accessor :type

      module TYPE
        MISSING_VALUE = "missing_value".freeze
      end

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      def initialize(type, msg="")
        super("#{type.to_s} #{msg}")
        @type = type
      end

    end
  end
end