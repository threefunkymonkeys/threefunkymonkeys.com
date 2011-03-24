module ApplicationHelper
  def threefunkymonkeys
    content_tag(:span, :class => "brand") do
      raw(
          content_tag(:span) do
            "3"
          end +
          content_tag(:span, :class => "funky") do
            "funky"
          end +
          content_tag(:span) do
            "monkeys"
          end
          )
    end
  end
end
