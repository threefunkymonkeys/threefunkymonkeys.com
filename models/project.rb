class Project
  @@projects = nil

  def self.all
    @@projects ||= Proc.new {
      begin
        json = JSON.parse(File.read("./projects.json"))

        {}.tap do |projects|
          json.each do |k, v|
            projects[k] = OpenStruct.new(v.merge(identifier: k))
          end
        end
      rescue => e
        puts "Cannot load projects: #{e.message}"
        {}
      end
    }.call

    @@projects.values
  end

  def self.[](id)
    self.all unless @@projects
    @@projects[id.to_s]
  end
end
