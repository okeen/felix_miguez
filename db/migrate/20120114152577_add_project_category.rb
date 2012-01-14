class AddProjectCategory< ActiveRecord::Migration
  def self.up
    add_column :projects , :category, :string
  end
  
  def self.down
    remove_column :projects , :category

  end
end
