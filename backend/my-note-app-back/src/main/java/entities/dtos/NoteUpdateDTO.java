package entities.dtos;

import lombok.Getter;

@Getter
public class NoteUpdateDTO {
    private String title;
    private String content;
    private Integer id;

}
