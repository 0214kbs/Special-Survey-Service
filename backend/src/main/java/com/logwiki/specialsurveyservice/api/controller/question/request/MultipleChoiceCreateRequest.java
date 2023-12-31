package com.logwiki.specialsurveyservice.api.controller.question.request;

import com.logwiki.specialsurveyservice.api.service.question.request.MultipleChoiceCreateServiceRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MultipleChoiceCreateRequest {

    @NotEmpty(message = "문제 보기 내용은 필수입니다.")
    private String content;

    @NotNull(message = "연계 문항 번호가 필요합니다 없는 경우 디폴트값 이 필요합니다.")
    private Long linkNumber;

    @Builder
    public MultipleChoiceCreateRequest(String content, Long linkNumber) {
        this.content = content;
        this.linkNumber = linkNumber;
    }

    public MultipleChoiceCreateServiceRequest toServiceRequest() {
        return MultipleChoiceCreateServiceRequest.builder()
                .content(content)
                .linkNumber(linkNumber)
                .build();
    }
}
