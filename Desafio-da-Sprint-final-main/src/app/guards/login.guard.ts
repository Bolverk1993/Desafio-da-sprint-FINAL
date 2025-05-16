import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const email = sessionStorage.getItem("email")

  if(!email){
    alert("Faça login para continuar")
    router.navigate([""])
    return false
  }
  return true;
};
