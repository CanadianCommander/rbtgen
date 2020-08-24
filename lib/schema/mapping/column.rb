module Schema::Mapping
  class Column

    attr_reader :name, :type, :key

    module TYPE
      UNKNOWN = :unknown.freeze
      STRING = :string.freeze
      INTEGER = :integer.freeze
      FLOAT = :float.freeze
      DATE = :date.freeze
      DATETIME = :date_time.freeze
      TIME = :time.freeze
      BINARY = :binary.freeze
      ENUM = :enum.freeze
    end

    module KEY
      NONE = :none.freeze
      PRIMARY = :primary.freeze
    end

    # regex for determining the type based on mariadb sql type
    module MARIADB_TYPE_REGEX
      STRING = /^((varchar)|(tinytext)|(text)|(mediumtext)|(longtext)|(char))/
      INTEGER = /^((tinyint)|(smallint)|(mediumint)|(int)|(integer)|(bigint))/
      FLOAT = /^((decimal)|(dec)|(numeric)|(fixed)|(number)|(float)|(double)|(double precision))/
      DATE = /^date/
      DATETIME = /^((datetime)|(timestamp))/
      TIME = /^time/
      BINARY = /^((varbinary)|(blob)|(mediumblob)|(longblob)|(bit))/
      ENUM = /^enum/
    end

    # regex for determining the key based on mariadb sql ke y
    module MARIADB_KEY_REGEX
      PRIMARY = /^pri/
    end

    # ----------------------------------------------------------
    # Class Methods
    # ----------------------------------------------------------

    # construct column type object from an SQL column type string
    # @param [String] column_name - column name
    # @param [String] sql_type - the sql type string
    # @param [String] sql_key - sql key type of column
    # @param [Symbol] database_type - the type of database that the sql came from. one of [:mariadb]
    # @return [Schema::Mapping::Column] - new column type object
    def self.from_sql(column_name, sql_type, sql_key, database_type=:mariadb)
      sql_type.downcase!
      sql_key.downcase!

      if database_type == :mariadb
        type_regex = MARIADB_TYPE_REGEX
        key_regex = MARIADB_KEY_REGEX
      else
        raise ArgumentError.new("Database Type [#{database_type}] is not a valid option")
      end

      type = TYPE::UNKNOWN
      if sql_type.match(type_regex::STRING)
        type = TYPE::STRING
      elsif sql_type.match(type_regex::INTEGER)
        type = TYPE::INTEGER
      elsif sql_type.match(type_regex::FLOAT)
        type = TYPE::FLOAT
      elsif sql_type.match(type_regex::DATE)
        type = TYPE::DATE
      elsif sql_type.match(type_regex::DATETIME)
        type = TYPE::DATETIME
      elsif sql_type.match(type_regex::TIME)
        type = TYPE::TIME
      elsif sql_type.match(type_regex::BINARY)
        type = TYPE::BINARY
      elsif sql_type.match(type_regex::ENUM)
        type = TYPE::ENUM
      else
        raise StandardError.new("SQL string [#{sql_type}] did not match any known type!")
      end

      key = KEY::NONE
      if sql_key.match(key_regex::PRIMARY)
        key = KEY::PRIMARY
      end

      return Column.new(column_name, type, key)
    end
    # ----------------------------------------------------------
    # Public Methods
    # ----------------------------------------------------------

    # @param [String] name - column name.
    # @param [Symbol] type - the column type.
    # @param [Symbol] key - the column key type.
    def initialize(name, type, key=KEY::NONE)
      @name = name
      @type = type
      @key = key
    end

    def to_hash
      hash = {
        type: @type.to_s,
      }

      unless @key == KEY::NONE
        hash[:key] = @key.to_s
      end

      return hash
    end
  end
end