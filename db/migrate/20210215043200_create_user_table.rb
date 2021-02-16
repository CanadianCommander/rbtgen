class CreateUserTable < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: false do |table|
      table.uuid :id, primary_key: true, default: 'uuid_generate_v4()'

      table.string :email

      table.string :password
      table.string :password_salt

      table.timestamps
      table.datetime :deleted_at

      table.index :email, unique: true
    end
  end
end
