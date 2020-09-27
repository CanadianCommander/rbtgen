module ::Rbt::Util
  module Template
    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # prefix fields found in sql with the provided id.
    # @param [String] sql - sql with {{<field>}}s to prefix
    # @param [String] id - the id to prefix
    # @return [String] - the prefixed sql
    def self.prepend_id_to_fields(sql, id)
      return sql.gsub(/{{([^}]+)}}/, id + '.\1')
    end

    # replace any occurrences of table_name with id in the sql
    # @param [String] sql - the sql
    # @param [String] table_name - the table name to replace
    # @param [String] id - the id to use instead of the table name
    # @return [String] the modified sql
    def self.replace_table_name_with_id(sql, table_name, id)
      return sql.gsub(/{{\s*#{table_name}.([^}]+)}}/, id + '.\1')
    end

  end
end