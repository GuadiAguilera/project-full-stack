package entities.mapper;

import entities.Note;
import entities.dtos.NoteDTO;
import entities.dtos.NoteUpdateDTO;
import org.mapstruct.*;

@Mapper(componentModel = "cdi")
public interface NoteUpdateMapper {
    @Mapping(target = "completed", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Note toEntity(NoteUpdateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(NoteUpdateDTO dto, @MappingTarget Note entity);

}
