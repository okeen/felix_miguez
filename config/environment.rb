# Load the rails application
require File.expand_path('../application', __FILE__)
# Initialize the rails application
Etware2::Application.initialize!

Sass::Plugin.add_template_location(
  Rails.root.join('public/stylesheets/scss').to_s,
  Rails.root.join('public/stylesheets').to_s
)
