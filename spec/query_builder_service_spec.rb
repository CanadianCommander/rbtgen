require 'rspec'

describe ::Rbt::QueryBuilderService do

  context 'when database_map loaded & query tree set' do
    input_source = ::Schema::Util::InputSource.new(File.open("test_schema_files/juno.yml"),
                                                   ::Schema::Util::InputSource::INPUT_TYPE::YAML)
    import_service = ::Schema::MappingImportService.new(input_source)
    @database_map = import_service.create_database_mapping


    demographic_model = @database_map.get_model("demographic")

    demographic_node = ::Rbt::QueryTree::Node.new(demographic_model)
    demographic_node.add_field!("demographic_no")
    demographic_provider_relation = demographic_model.get_relation("demographic_provider")
    provider_node = ::Rbt::QueryTree::Node.new(@database_map.get_model("provider"))
    provider_node.add_field!("first_name")
    provider_node.add_field!("last_name")
    demographic_node.connect_to_node!(provider_node, demographic_provider_relation)

    it 'should produce sql' do
      query_builder = ::Rbt::QueryBuilderService.new(@database_map)
      sql = query_builder.build_query(demographic_node)

      expect(sql.match?(/SELECT.*demographic_no.*first_name.*last_name\s+FROM demographic.* LEFT JOIN.*provider/)).to be_truthy
    end

    # provider_no equal to ?
    provider_node.add_filter!(::Rbt::QueryTree::Filter.new(@database_map.get_model("provider")
                                                           .get_filter("provider_no_gen_filter_eql")),
                              ::Rbt::QueryTree::Filter::CONDITION::NONE)


    # demographic name = ? AND year of birth > ?
    demographic_node.add_filter!(::Rbt::QueryTree::Filter.new(demographic_model.get_filter("first_name_gen_filter_eql")),
                                 ::Rbt::QueryTree::Filter::CONDITION::NONE)
    demographic_node.add_filter!(::Rbt::QueryTree::Filter.new(demographic_model.get_filter("year_of_birth_gen_filter_gt")),
                                 ::Rbt::QueryTree::Filter::CONDITION::AND)

    it 'should produce sql filters' do
      query_builder = ::Rbt::QueryBuilderService.new(@database_map)
      sql = query_builder.build_query(demographic_node)

      expect(sql.match?(/.*WHERE.*provider_no = \?.*WHERE\s*\(.*first_name = \? AND.*year_of_birth > \?\s*\);/)).to be_truthy
    end

  end
end