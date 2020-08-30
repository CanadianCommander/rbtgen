module Schema
  module Mapping
    class Filter

      VARIABLE_REPLACE_STRING = "?".freeze

      attr_reader :name, :filter_sql, :required_tables

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      # @param [String] name - filter name
      # @param [String] filter_sql - sql filter
      # @param [Array<String>] required_tables - tables that must be present in the join in order for this filter to function
      def initialize(name, filter_sql, required_tables)
        @name = name
        @filter_sql = filter_sql
        @required_tables = required_tables
      end

    end
  end
end