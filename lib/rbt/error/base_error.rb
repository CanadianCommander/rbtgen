module ::Rbt::Error
  class BaseError < StandardError
    alias_method :super_to_s, :to_s

    # ==========================================================
    # Converters
    # ==========================================================

    # @return [String] string representation of this object
    def to_s
      return "#{self.class.name} #{self.super_to_s}\n#{self.backtrace.join("\n")}"
    end

    # like to_s but does not include stack trace
    # @return [String] string representation of this object
    def to_s_no_stack
      return "#{self.class.name} #{self.super_to_s}"
    end
  end
end