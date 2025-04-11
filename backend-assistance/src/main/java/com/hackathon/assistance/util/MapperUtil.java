package com.hackathon.assistance.util;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperUtil {

    @Autowired
    private ModelMapper modelMapper;

    public <S, D> D convertToDto(S source, Class<D> destinationType) {
        return modelMapper.map(source, destinationType);
    }

    public <S, D> S convertToModel(D dto, Class<S> modelType) {
        return modelMapper.map(dto, modelType);
    }
}
