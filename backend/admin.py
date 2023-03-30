from django.contrib import admin

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Notice, Invitation


class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'sub_title', 'description', 'end_date', 'creation_date',)
    readonly_fields = ('creation_date',)
    fields = list_display + ('users',)


admin.site.register(Notice, NoticeAdmin)


class InvitationAdmin(admin.ModelAdmin):
    list_display = ('email', 'reg_done',)
    readonly_fields = ('reg_done',)
    fields = list_display

    def save_model(self, request, obj, form, change):
        print(obj.email, request)
        # obj.notice = request.otice
        super().save_model(request, obj, form, change)
        sendEmil = SendEmail()
        try:
            sendEmil.sendEmail(obj)
        except Exception as e:
            print('Somethings went wrong with invitation email sending', e)


admin.site.register(Invitation, InvitationAdmin)
