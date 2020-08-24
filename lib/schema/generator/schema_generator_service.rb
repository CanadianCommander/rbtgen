module Schema
  module Generator
    # used to generate schema map files from an existing Oscar / Juno database
    class SchemaGeneratorService

      attr_accessor :mysql_client, :limit_tables

      # ----------------------------------------------------------
      # Public Methods
      # ----------------------------------------------------------

      # initialize the generator
      # @param [Mysql2::Client] mysql_client - the mysql connection to use.
      # @param [Array<String>] limit_tables - if not nil limit to only these tables
      def initialize(mysql_client, limit_tables)
        @mysql_client = mysql_client
        @limit_tables = limit_tables
      end


      # generate a database schema map
      # @param [IO] output_io - the io stream to output to.
      def generate(output_io)
        output_hash = {}

        model_hash = {}
        tables = @mysql_client.query("show tables")
        tables.each do |tbl|
          tbl.each_value do |tbl_name|

            # filter
            unless @limit_tables.nil?
              unless @limit_tables.include? tbl_name
                next
              end
            end

            tbl_hash = {}

            # fields
            tbl_hash[:fields] = generate_table_fields(tbl_name)

            model_hash[tbl_name] = tbl_hash
          end
        end
        output_hash[:models] = model_hash

        output_io << output_hash.deep_stringify_keys.to_yaml
      end

      # ----------------------------------------------------------
      # Private Methods
      # ----------------------------------------------------------
      private

      # generate table field definitions
      # @param [String] tbl_name - the table name to generate filed definitions for
      # @return [Hash] filed hash
      def generate_table_fields(tbl_name)
        field_hash = {}
        fields = @mysql_client.query("desc #{tbl_name}")
        fields.each do |field|
          field_hash[field["Field"]] = ::Schema::Mapping::Column.from_sql(field["Field"], field["Type"], field["Key"]).to_hash
        end

        return field_hash
      end


    end
  end
end