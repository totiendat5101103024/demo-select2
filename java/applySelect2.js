$(document).ready(function () {
    $('#province-select-Select2').select2({
        width: '100%'
    });

    $('#province-select-Select2-multi').select2({
        width: '100%'
    });

    $('#province-select-Select2-multi-dp').select2({
        width: '100%',
        closeOnSelect: false
    });

    $('#province-select-Select2-multi-limit').select2({
        width: '100%',
        maximumSelectionLength: 3
    });

    $('#province-select-Select2-multi-clearable').select2({
        width: '100%',
        placeholder: 'Chọn Tỉnh/Thành phố',
        allowClear: true
    });

    $('#province-select-Select2-disable').select2({
        width: '100%'
    });

    $('#province-select-Select2-multi-disable').select2({
        width: '100%',
        placeholder: '-- Chọn Tỉnh/Thành phố --'
    });

    $(".js-btn-enable").on("click", function () {
        $("#province-select-Select2-disable").prop("disabled", false);
        $("#province-select-Select2-multi-disable").prop("disabled", false);
    });

    $(".js-btn-disable").on("click", function () {
        $("#province-select-Select2-disable").prop("disabled", true);
        $("#province-select-Select2-multi-disable").prop("disabled", true);
    });

    $('#province-select-Select2-w-50').select2({
        width: 'resolve'
    });

    $('#province-select-Select2-w-75').select2({
        width: 'resolve'
    });

    $('#province-select-Select2-dynamic').select2({
        width: '100%',
        tags: true
    });

    $('#province-select-Select2-dynamic-multi').select2({
        width: '100%',
        tags: true
    });

    $('#province-select-Select2-dynamic-multi-token').select2({
        width: '100%',
        tags: true,
        tokenSeparators: [',', ' ']
    });

    $('#province-select-Select2-theme1').select2({
        width: '100%',
        theme: 'classic'
    });

    $('#province-select-Select2-theme2').select2({
        width: '100%',
        theme: 'classic'
    });
});

var myData = [
    {
        id: 'VN',
        text: 'Việt Nam',
        selected: true
    },
    {
        id: 'US',
        text: 'Hoa Kỳ',
        disabled: true
    },
    {
        id: 'JP',
        text: 'Nhật Bản'
    },
    {
        id: 'KR',
        text: 'Hàn Quốc'
    },
]

$(document).ready(function () {
    $('#country-select-Select2-selected').select2({
        width: '100%',
        data: myData,
        allowClear: true
    });
});


var myData1 = [
    {
        text: 'Châu Á',
        children: [
            {
                id: 'VN',
                text: 'Việt Nam'
            },
            {
                id: 'CHN',
                text: 'Trung Quốc'
            }
        ]
    },
    {
        text: 'Châu Âu',
        children: [
            {
                id: 'FR',
                text: "Pháp"
            },
            {
                id: 'ITA',
                text: 'Ý'
            }
        ]
    }
]

$(document).ready(function () {
    $('#country1-select-Select2-selected').select2({
        width: '100%',
        data: myData1,
        allowClear: true
    });
});

$(document).ready(function () {
    $(".js-data-example-ajax").select2({
        ajax: {
            url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                return {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        placeholder: 'Search for a repository',
        minimumInputLength: 1,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });

    function formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var $container = $(
            "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
            "<div class='select2-result-repository__meta'>" +
            "<div class='select2-result-repository__title'></div>" +
            "<div class='select2-result-repository__description'></div>" +
            "<div class='select2-result-repository__statistics'>" +
            "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> </div>" +
            "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> </div>" +
            "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> </div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );

        $container.find('.select2-result-repository__avatar img').css({
            'width': '60px',
            'height': '60px',
        });

        $container.find('.select2-result-repository__title').css({
            'color': 'white',
            'font-weight': '700',
            'word-wrap': 'break-word',
            'line-height': '1.1'
        });

        $container.find(".select2-result-repository__title").text(repo.full_name);
        $container.find(".select2-result-repository__description").text(repo.description);
        $container.find(".select2-result-repository__forks").append(repo.forks_count + " Forks");
        $container.find(".select2-result-repository__stargazers").append(repo.stargazers_count + " Stars");
        $container.find(".select2-result-repository__watchers").append(repo.watchers_count + " Watchers");

        return $container;
    }

    function formatRepoSelection(repo) {
        return repo.full_name || repo.text;
    }
});
