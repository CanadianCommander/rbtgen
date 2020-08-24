module Schema
  module Util
    module Validation

      # check that all required keys are present in a hash.
      # @param [String] model_name - the model being validated (used for error message)
      # @param [Hash] hash - the hash to check
      # @param [Symbol] keys - the keys to check
      def self.require_keys(model_name, hash, *keys)
        keys.each do |key|
          unless hash.has_key?(key)
            raise ::Schema::Error::ValidationError.new(::Schema::Error::ValidationError::TYPE::MISSING_VALUE,
                                                       "Schema Class: #{model_name} Key: #{key.to_s}")
          end
        end
      end
    end
  end
end