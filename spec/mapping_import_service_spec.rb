
RSpec.describe ::Schema::MappingImportService do
  # load database map
  before(:context) do
    input_source = ::Schema::Util::InputSource.new(File.open("test_schema_files/juno.yml"),
                                                   ::Schema::Util::InputSource::INPUT_TYPE::YAML)
    import_service = ::Schema::MappingImportService.new(input_source)
    @database_map = import_service.create_database_mapping
  end

  it "Should load models " do
    expect(@database_map.models.length).to be > 0
  end

  it "Should have columns in models" do
    @database_map.models.each do |model|
      expect(model.columns.length).to be > 0
      model.columns.each do |column|
        expect(column.name.blank?).not_to be true
        expect(column.type.blank?).not_to be true
      end
    end
  end

  it "Should have a relation on demographic to provider (demographic_provider)" do
    provider_model = @database_map.get_model("provider")
    demographic_model = @database_map.get_model("demographic")
    expect(demographic_model.relations.length).to be > 0

    demo_provider_rel = demographic_model.get_relation("demographic_provider")
    expect(demo_provider_rel.from_model).to eq demographic_model
    expect(demo_provider_rel.to_model).to eq provider_model
    expect(demo_provider_rel.join_type).to eq ::Schema::Mapping::Relation::JOIN_TYPE::LEFT
    expect(demo_provider_rel.join_condition).to eq "demographic.provider_no = provider.provider_no"

  end




end