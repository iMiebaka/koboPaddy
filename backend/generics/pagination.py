from rest_framework import pagination
from rest_framework.response import Response
from collections import OrderedDict


class CustomPagination(pagination.PageNumberPagination):
    page_query_param = "page"
    page_size_query_param = "limit"
    max_page_size = 100

    def get_paginated_response(self, data) -> Response:
        _next = self.page.next_page_number() if self.page.has_next() else None
        _prev = self.page.previous_page_number() if self.page.has_previous() else None
        return Response(
            OrderedDict(
                [
                    ("count", self.page.paginator.count),
                    ("next", _next),
                    ("previous", _prev),
                    ("page_size", self.get_page_size(self.request)),
                    ("page_count", self.page.paginator.num_pages),
                    ("current_page", self.page.number),
                    ("results", data),
                ]
            )
        )



class MyPagination(pagination.PageNumberPagination):
    page_size = 30
    
    @property
    def paginator(self):
        return self
    
    @property
    def total_pages(self):
        return self.page.paginator.num_pages
    
