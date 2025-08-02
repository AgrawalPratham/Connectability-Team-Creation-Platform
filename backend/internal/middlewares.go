package internal

import (
	"net/http"

	"github.com/agrawalpratham/Connectability/BackEnd/config"
)

func authenticateMiddleware(next http.Handler) http.Handler{
	return http.HandlerFunc( func(w http.ResponseWriter, r *http.Request){
		session, _ := config.App.Session.Get(r, "Connectability")
		user_email, ok := session.Values["userEmail"].(string)
		if !ok || user_email == "" {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Not authorized"))
			return
		}
		// Set UserEmail and proceed to the next handler
		// config.App.UserEmail = user_email
		// ctx := context.WithValue(r.Context(), "email", user_email)
		// newreq := r.Clone(ctx)
		next.ServeHTTP(w, r)
	})
}