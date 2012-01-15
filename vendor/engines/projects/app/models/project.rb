class Project < ActiveRecord::Base

  acts_as_indexed :fields => [:title, :description]

  validates :title, :presence => true, :uniqueness => true
  
  belongs_to :main_image, :class_name => 'Image'
  belongs_to :secondary_image, :class_name => 'Image'
  
  scope :by_category, lambda{ |category|
    where("category = :category", category: category)
  }
end
