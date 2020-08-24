require_relative '../../config/application'
require 'pp'

module TaskUtil

  # setup the thor task. Call this at the start of all thor tasks
  # @param [Symbol] command - the command that is running
  def setup_task(command)
    ENV['RAILS_ENV'] ||= 'development'
    require File.expand_path('config/environment.rb')

    if options[:help]
      help(command)
      exit 0
    end
  end

end
