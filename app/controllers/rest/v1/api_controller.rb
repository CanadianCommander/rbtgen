module ::Rest::V1
  class ApiController < ApplicationController

    # ==========================================================
    # Hooks
    # ==========================================================
    around_action :action_wrapper


    # ==========================================================
    # Public Methods
    # ==========================================================

    # wrap all api calls in global exception handler
    def action_wrapper
      begin
        yield
      rescue ::Rbt::Error::AuthError => e
        handle_auth_error(e)
      rescue ActiveRecord::RecordInvalid => e
        handle_validation_error(e)
      rescue => e
        handle_unknown_error(e)
      end
    end

    # ==========================================================
    # Protected Methods
    # ==========================================================
    protected

    # handle authentication error
    # @param [Rbt::Error::AuthError] error - auth error
    def handle_auth_error(error)
      Rails.logger.warn(error.to_s_no_stack)
      api_error = ::Transfer::Error::ApiError.new(::Transfer::Error::ApiError::ERROR_CODE::BAD_AUTH, error.to_s_no_stack, "Insufficient Privileges")
      render json: api_error, status: :bad_request
    end

    # handle active record validation error
    # @param [ActiveRecord::RecordInvalid] error
    def handle_validation_error(error)
      Rails.logger.error(error.to_s)

      # build field error list
      field_errors = []
      error.record.errors.each do |error|
        field_errors << {field: error.attribute, type: error.type}
      end

      api_error = ::Transfer::Error::ApiError.new(
        ::Transfer::Error::ApiError::ERROR_CODE::VALIDATION_ERROR,
        error.to_s,
        "Validation Error",
        {
          field_errors: field_errors,
        })

      render json: api_error, status: :bad_request
    end

    # handle an unknown error
    # @Param [StandardError] error
    def handle_unknown_error(error)
      Rails.logger.error("#{error.class.name} #{error.to_s} #{error.backtrace.join("\n")}")
      api_error = ::Transfer::Error::ApiError.new(::Transfer::Error::ApiError::ERROR_CODE::GENERIC, error.to_s, "Unknown Error")
      render json: api_error, status: :bad_request
    end

  end
end