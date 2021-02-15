module ::Transfer::Error
  class ApiError

    attr_reader :error_message, :error_code, :user_message, :data

    module ERROR_CODE
      GENERIC = "generic".freeze
      VALIDATION_ERROR = "validation_error".freeze
      BAD_AUTH = "bad_auth  ".freeze
    end

    # ==========================================================
    # Public Methods
    # ==========================================================

    # create a new api_error
    # @param [String] error_code - the error code. one of ERROR_CODE
    # @param [String] error_message - the technical error message
    # @param [String] user_message - a user friendly error message
    # @param [Hash] data - additional error data
    def initialize(error_code, error_message = "", user_message = "", data = nil)
      super()
      @error_code = error_code
      @error_message = error_message
      @user_message = user_message
      @data = data
    end
  end
end