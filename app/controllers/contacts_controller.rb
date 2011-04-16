class ContactsController < ApplicationController
  def create
    @contact = Contact.new(params[:contact])

    respond_to do |format|
      if @contact.save
        format.html { flash[:notice] = t('application.messages.thank_you') }
      else
        format.html { flash[:error] = t('application.messages.contact_error') }
      end
    end
    redirect_to root_path
  end
end
