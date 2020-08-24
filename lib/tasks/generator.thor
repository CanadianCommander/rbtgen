require_relative "task_util"

class Generator < Thor
  include ::TaskUtil

  namespace "generator"
  package_name "generator"

  # ----------------------------------------------------------
  # Public Tasks
  # ----------------------------------------------------------

  desc "generate_schema_map", "generate a schema map from a database Juno / Oscar"
  method_option :host, default: "localhost", aliases: "-h", desc: "Database host server"
  method_option :user, default: "root", aliases: "-u", desc: "Database user"
  method_option :password, aliases: "-p", desc: "Password for the database user"
  method_option :database, aliases: "-d", desc: "Database"
  method_option :tunnel, type: :boolean, aliases: "-t", desc: "If present tunnel to the database server through ssh"
  method_option :tunnel_user, default: "root", desc: "the ssh user to tunnel as"
  method_option :tunnel_port, type: :numeric, default: 22, desc: "the ssh port"
  method_option :limit_tables, type: :array, aliases: "-l", desc: "a list of tables to limit the generation too. Ex, tbl1,tbl2,tbl3..."
  method_option :help, type: :boolean, aliases: "-h", desc: "Show this message."
  def generate_schema_map
    setup_task(:generate_schema_map)

    if options[:tunnel].nil?
      generate_database_map(::Schema::Generator.connect_to_database(options[:host], options[:database],
                                                                    options[:user], options[:password]), options[:limit_tables])
    else
      Schema::Generator.with_ssh_tunnel(options[:host], options[:tunnel_user], Schema::Generator::MYSQL_PORT, options[:tunnel_port]) do |port|
        generate_database_map(::Schema::Generator.connect_to_database("127.0.0.1", options[:database],
                                                                      options[:user], options[:password], port), options[:limit_tables])
      end
    end

  end

  # ----------------------------------------------------------
  # Private Methods
  # ----------------------------------------------------------
  private

  # generate the database map
  # @param [::Mysql2::Client] mysql_client - the mysql client
  # @param [Array<String>] limit_tables - a list of tables to limit generation too.
  def generate_database_map(mysql_client, limit_tables)
    schema_generator = ::Schema::Generator::SchemaGeneratorService.new(mysql_client, limit_tables)
    schema_generator.generate(STDOUT)
  end

end