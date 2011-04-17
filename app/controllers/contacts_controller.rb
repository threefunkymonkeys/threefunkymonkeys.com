class ContactsController < ApplicationController
  def create
    @contact = Contact.new(params[:contact])

    respond_to do |format|
      if @contact.save
        format.html do 
          flash[:notice] = t('application.messages.thank_you') 
          redirect_to root_path
        end
      else
        format.html do
          flash[:error] = t('application.messages.invalid_email')
          redirect_to root_path
        end
      end
    end
  end
end
