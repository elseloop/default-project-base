class Navigator
    constructor: (@el) ->
        @links = @el.find('a[data-target]')
        @role_links = $('a[role=nav_link]')
        @fix_offset = @el.offset().top + 50
        @fixed = false
        @fix_class = 'fix'
        @sections = $('#content .section')
        @section_offsets = {}
        @selected = ''
        @nav_height = @el.height()

        @calculate_section_offsets()

        @links.click (e) =>
            e.preventDefault()

            $el = $(e.target)

            @navigate_to $el.data('target'), $el

        @role_links.click (e) =>
            e.preventDefault()

            $el = $(e.target)

            @navigate_to $el.data('target'), $el            

        $(window).scroll (e) =>
            scrolltop = $(window).scrollTop()

            if !@fixed && scrolltop >= @fix_offset
                @fixiate()
            else if @fixed && scrolltop < @fix_offset
                @fixiate(true)

            @spy scrolltop

    spy: (top = null) =>
        top = $(window).scrollTop() if not top
        select_section = "index"

        _.each @section_offsets, (section_top, name) ->
            select_section = name if section_top > top && select_section == "index"

        @change_selected select_section if select_section != "index"

    change_selected: (name) =>
        return if name == @selected

        @selected = name
        @el.find('.active').removeClass('active')
        @el.find("[data-target=#{@selected}]").parent('li').addClass 'active'

        baseUrl = window.location.href.split('#')[0];
        window.location.replace(baseUrl + "##{@selected}");

    images_loaded: ->
        all_loaded = true

        @sections.each (i, el) =>
            #if one already failed, give up
            return if !all_loaded

            if $(el).find('img').length
                $(el).find('img').each (k, img) ->
                    #check if the image is loaded
                    if !img.complete || img.naturalWidth == "undefined" || img.naturalWidth == 0
                        all_loaded = false

        return all_loaded


    calculate_section_offsets: =>
        # if all the images aren't loaed yet then try again in 100ms
        if !@images_loaded()
            setTimeout =>
                @calculate_section_offsets()
            , 100

            return

        @sections.each (i, e) =>
            @section_offsets[$(e).data('name')] = $(e).offset().top

    fixiate: (undo=false) =>
        @fixed = !undo

        if @fixed
            @el.addClass @fix_class
        else
            @el.removeClass @fix_class

    navigate_to: (target) =>
        return if not target

        $target = if target == "index"
            $ 'body'
        else
            $ ".section[data-name=#{target}]"

        return if not $target.length

        _gaq.push(['_trackEvent', 'navigate', target])

        $('html,body').animate { scrollTop: $target.offset().top - 50 }

$ ->
    $win = $ window
    $main_nav = $ '#main-nav'

    $('pre').each (i, e) -> 
        hljs.highlightBlock(e)

    nav = new Navigator $main_nav

    if window.location.hash.length
        setTimeout ->
            nav.navigate_to window.location.hash.replace("#", "")
        , 350
