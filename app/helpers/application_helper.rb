module ApplicationHelper
  def threefunkymonkeys
    content_tag(:span, :class => "brand") do
      raw(
          content_tag(:span, "3") +
          content_tag(:span, "funky", :class => "funky")+
          content_tag(:span, "monkeys")
          )
    end
  end
end
