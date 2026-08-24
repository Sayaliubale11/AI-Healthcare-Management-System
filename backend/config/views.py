from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "AI-Powered Medical Appointment and Healthcare Management System API",
        "status": "Running",
        "version": "1.0"
    })