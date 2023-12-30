import React from 'react'
import { useNavigate } from 'react-router-dom'

export const useRedirect = (url) => {
    const navigate = useNavigate(url);
  return navigate;
}
