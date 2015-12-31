# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "bson"
  s.version = "1.6.4"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Jim Menard", "Mike Dirolf", "Kyle Banker"]
  s.date = "2012-06-06"
  s.description = "A Ruby BSON implementation for MongoDB. For more information about Mongo, see http://www.mongodb.org. For more information on BSON, see http://www.bsonspec.org."
  s.email = "mongodb-dev@googlegroups.com"
  s.executables = ["b2json", "j2bson"]
  s.files = ["bin/b2json", "bin/j2bson"]
  s.homepage = "http://www.mongodb.org"
  s.require_paths = ["lib"]
  s.rubygems_version = "2.0.14"
  s.summary = "Ruby implementation of BSON"
end
