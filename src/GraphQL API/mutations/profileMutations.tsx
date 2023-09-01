import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $city: String = ""
    $country: String = ""
    $firstName: String = ""
    $lastName: String = ""
  ) {
    updateProfile(
      city: $city
      country: $country
      firstName: $firstName
      lastName: $lastName
    ) {
      success
      errors {
        email
        session
        user
        userName
        verifyCode
      }
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($avatar: String = "") {
    updateProfile(avatar: $avatar) {
      success
      errors {
        email
        session
        user
        userName
        verifyCode
      }
    }
  }
`;
