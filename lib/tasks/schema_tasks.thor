require_relative "task_util"

class SchemaTasks < Thor
  include ::TaskUtil

  namespace "schema_tasks"
  package_name "schema_tasks"

  desc "load_database_map", "load a database map file. More of a development / testing thor task"
  method_option :file, aliases: "-f", desc: "Database map file to load."
  method_option :help, type: :boolean, aliases: "-h", desc: "Show this message."
  def load_database_map
    setup_task(:load_database_map)


    input_type = ::Schema::Util::InputSource.input_type_from_path(options[:file])
    input_source = ::Schema::Util::InputSource.new(File.open(options[:file]), input_type)
    import_service = ::Schema::MappingImportService.new(input_source)

    database_map = import_service.create_database_mapping

    database_map.models.each do |model|
      puts ">>>>>>>>>>>>>>>>>>>>>>>>>>"
      puts Hash[model.table_name, model.to_hash]
      puts "<<<<<<<<<<<<<<<<<<<<<<<<<<"
    end
  end

end