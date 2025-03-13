from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed



class CookiesJWTAuthentication(JWTAuthentication):
    """Custom authentication class"""
    def authenticate(self, request):
        access_token  = request.COOKIES.get("access_token")

        if not access_token:
            return None
        
        try:
            validated_token = self.get_validated_token(access_token)
        
        except AuthenticationFailed as e:
            raise AuthenticationFailed(f"Token validation failed:{str(e)}")

        try:
            user = self.get_user(validated_token)
        except AuthenticationFailed as e:
            raise AuthenticationFailed(f"Error retrieving user:{str(e)}")

        return (user, validated_token)
