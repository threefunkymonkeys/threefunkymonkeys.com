module ApplicationHelper
  def threefunkymonkeys
    content_tag(:span, :class => "brand") do
      raw(
          returning("") do |brand|
            brand << content_tag(:span) do
              "3"
            end
            brand << content_tag(:span, :class => "funky") do
              "funky"
            end
            brand << content_tag(:span) do
              "monkeys"
            end
          end
          )
    end
  end
end
