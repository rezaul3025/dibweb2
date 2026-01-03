from __future__ import annotations

import os
from functools import wraps
from django.http import JsonResponse

def require_header():
    """
    Require a header to exist. Optionally require it to match an exact value.
    Header lookup is case-insensitive.
    """

    SEC_HEADER = os.environ.get('SEC_HEADER')
    SEC_HEADER_VALUE = os.environ.get('SEC_HEADER_VALUE')

    def decorator(view_func):
        @wraps(view_func)
        def _wrapped(request, *args, **kwargs):
            actual = request.headers.get(SEC_HEADER)  # Django 2.2+; case-insensitive

            if actual is None:
                return JsonResponse(
                    {"detail": f"Unauthorized header access"},
                    status=400,
                )

            if SEC_HEADER_VALUE is not None and actual != SEC_HEADER_VALUE:
                return JsonResponse(
                    {"detail": f"Unauthorized header access"},
                    status=403,
                )

            return view_func(request, *args, **kwargs)
        return _wrapped
    return decorator
