package com.capsulascba.api.mapper;

import com.capsulascba.api.dto.UserDTO;
import com.capsulascba.api.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user);

    User toEntity(UserDTO userDTO);

    List<UserDTO> toDTOList(List<User> users);
}
